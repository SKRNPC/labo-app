import LaborantShow from "./LaborantShow";

function LaborantList({laborants, onDelete, onUpdate}) {
    return ( 
    <div className="laborant-list">
        {laborants.map((input, index)=>{
            return (<LaborantShow key={index} input={input} onDelete={onDelete} onUpdate={onUpdate}/>)
        })}
    </div> );
}

export default LaborantList;