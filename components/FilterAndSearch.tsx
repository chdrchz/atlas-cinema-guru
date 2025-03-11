import Input from "./Input";

export default function FilterAndSearch() {
    return (
        <div className="container-filter">
            <Input placeholder="Search Movies"/>
            <div className="min-max-year">
                <Input placeholder="Min Year"/>
                <Input placeholder="Max Year"/>
            </div>
        </div>
    )
}