import Input from "./Inputs/Input";
import InputTwo from "./Inputs/InputTwo";

export default function FilterAndSearch() {
    return (
        <div className="container-filter">
            <Input placeholder="Search Movies"/>
            <div className="min-max-year">
                <InputTwo placeholder="Min Year"/>
                <InputTwo placeholder="Max Year"/>
            </div>
        </div>
    )
}