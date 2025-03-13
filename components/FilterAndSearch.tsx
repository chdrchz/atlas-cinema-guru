import Input from "./Inputs/Input";

import "@/styles/FilterAndSearch/styles.css"

export default function FilterAndSearch() {
    return (
        <div className="container-filter">
            <div className="search-movies">
                <p>Search</p>
                <Input placeholder="Search Movies"/>
            </div>
            <div className="min-max-year">
                <div className="min-year">
                    <h1>Min Year</h1>
                    <Input placeholder="Min Year"/>
                </div>
                <div className="max-year">
                    <h1>Max Year</h1>
                    <Input placeholder="Max Year"/>
                </div>
            </div>
        </div>
    )
}