import { supabase } from "./supabaseClient";
import { Question, User } from "./definitions";

/**
 * Query all titles
 */
export async function fetchTitles(
  page: number,
  minYear: number,
  maxYear: number,
  query: string,
  genres: string[],
  userEmail: string
) {
  try {
    // Get favorites title ids
    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("title_id")
      .eq("user_id", userEmail);

    if (favoritesError) throw favoritesError;
    const favoriteIds = favorites ? favorites.map((row) => row.title_id) : [];

    // Get watch later title ids
    const { data: watchLater, error: watchLaterError } = await supabase
      .from("watchlater")
      .select("title_id")
      .eq("user_id", userEmail);

    if (watchLaterError) throw watchLaterError;
    const watchLaterIds = watchLater ? watchLater.map((row) => row.title_id) : [];

    // Build the query
    let query_builder = supabase
      .from("titles")
      .select("*")
      .gte("released", minYear)
      .lte("released", maxYear);

    // Add text search if query is provided
    if (query && query.trim() !== "") {
      query_builder = query_builder.ilike("title", `%${query}%`);
    }

    // Add genre filter if genres are provided
    if (genres && genres.length > 0) {
      query_builder = query_builder.in("genre", genres);
    }

    // Finish the query with pagination and ordering
    const { data: titles, error: titlesError } = await query_builder
      .order("title", { ascending: true })
      .range((page - 1) * 6, page * 6 - 1);

    if (titlesError) throw titlesError;

    return titles.map((row) => ({
      ...row,
      favorited: favoriteIds.includes(row.id),
      watchLater: watchLaterIds.includes(row.id),
      image: `/images/${row.id}.webp`,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch titles.");
  }
}

/**
 * Get a users favorites list.
 */
export async function fetchFavorites(page: number, userEmail: string) {
  try {
    // Get watch later title ids
    const { data: watchLater, error: watchLaterError } = await supabase
      .from("watchlater")
      .select("title_id")
      .eq("user_id", userEmail);

    if (watchLaterError) throw watchLaterError;
    const watchLaterIds = watchLater ? watchLater.map((row) => row.title_id) : [];

    // First get the favorite IDs
    const { data: favoriteItems, error: favoriteError } = await supabase
      .from("favorites")
      .select("title_id")
      .eq("user_id", userEmail)
      .range((page - 1) * 6, page * 6 - 1);

    if (favoriteError) throw favoriteError;
    
    // If there are no favorite items, return empty array
    if (!favoriteItems || favoriteItems.length === 0) {
      return [];
    }
    
    // Get the title IDs
    const titleIds = favoriteItems.map(item => item.title_id);
    
    // Then fetch the actual titles
    const { data: titles, error: titlesError } = await supabase
      .from("titles")
      .select("*")
      .in("id", titleIds)
      .order("released", { ascending: true });
      
    if (titlesError) throw titlesError;

    return titles.map((title) => ({
      ...title,
      favorited: true,
      watchLater: watchLaterIds.includes(title.id),
      image: `/images/${title.id}.webp`,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites.");
  }
}

/**
 *  Add a title to a users favorites list.
 */
export async function insertFavorite(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("favorites")
      .insert({ title_id, user_id: userEmail });

    if (error) throw error;
    
    await insertActivity(title_id, userEmail, "FAVORITED");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add favorite.");
  }
}

/**
 * Remove a title from a users favorites list.
 */
export async function deleteFavorite(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("title_id", title_id)
      .eq("user_id", userEmail);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  }
}

/**
 * Check if a title is in a users favorites list.
 */
export async function favoriteExists(title_id: string, userEmail: string) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("title_id", title_id)
      .eq("user_id", userEmail);

    if (error) throw error;
    return data && data.length > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorite.");
  }
}

/**
 * Get a users watch later list.
 */
export async function fetchWatchLaters(page: number, userEmail: string) {
  try {
    // Get favorites title ids
    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("title_id")
      .eq("user_id", userEmail);

    if (favoritesError) throw favoritesError;
    const favoriteIds = favorites ? favorites.map((row) => row.title_id) : [];

    // Join watchlater and titles - FIX THE ORDER SYNTAX
    const { data: titles, error: titlesError } = await supabase
      .from("watchlater")
      .select(`
        title_id,
        titles:titles(*)
      `)
      .eq("user_id", userEmail)
      .order("titles(released)", { ascending: true }) // Fixed ordering syntax
      .range((page - 1) * 6, page * 6 - 1);

    if (titlesError) throw titlesError;

    return titles.map((row) => ({
      ...row.titles,
      favorited: favoriteIds.includes(row.title_id),
      watchLater: true,
      image: `/images/${row.title_id}.webp`,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch watchLater.");
  }
}

/**
 * Add a title to a users watch later list.
 */
export async function insertWatchLater(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("watchlater")
      .insert({ title_id, user_id: userEmail });

    if (error) throw error;
    
    await insertActivity(title_id, userEmail, "WATCH_LATER");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add watchLater.");
  }
}

/**
 * Remove a title from a users watch later list.
 */
export async function deleteWatchLater(title_id: string, userEmail: string) {
  try {
    const { error } = await supabase
      .from("watchlater")
      .delete()
      .eq("title_id", title_id)
      .eq("user_id", userEmail);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add watchLater.");
  }
}

/**
 * Check if a movie title exists in a user's watch later list.
 */
export async function watchLaterExists(
  title_id: string,
  userEmail: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("watchlater")
      .select("*")
      .eq("title_id", title_id)
      .eq("user_id", userEmail);

    if (error) throw error;
    return data && data.length > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch watchLater.");
  }
}

/**
 * Get all genres for titles.
 */
export async function fetchGenres(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from("titles")
      .select("genre")
      .order("genre");

    if (error) throw error;
    
    // Extract unique genres
    const uniqueGenres = [...new Set(data.map(item => item.genre))];
    return uniqueGenres;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch genres.");
  }
}

/**
 * Get a users activity list.
 */
export async function fetchActivities(page: number, userEmail: string) {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select(`
        id,
        timestamp,
        activity,
        titles(title)
      `)
      .eq("user_id", userEmail)
      .order("timestamp", { ascending: false })
      .range((page - 1) * 10, page * 10 - 1);

    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      timestamp: item.timestamp,
      activity: item.activity,
      title: item.titles.title
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch activities.");
  }
}

async function insertActivity(
  title_id: string,
  userEmail: string,
  activity: "FAVORITED" | "WATCH_LATER"
) {
  try {
    const { error } = await supabase
      .from("activities")
      .insert({ 
        title_id, 
        user_id: userEmail, 
        activity 
      });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add activity.");
  }
}