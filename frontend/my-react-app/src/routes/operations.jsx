import { useQuery } from '@tanstack/react-query';
import { fetchAllOps } from '../api/operations.js';
import { MainTable } from '../components/mainTable.jsx';

const theadContent = ['ID' , 'START DATE' , 'TYPE' , 'STATUS' , 'END DATE' , 'PRODUCT' ,'QTY' , 'COMMENT'];
const tbodyContent = [ 'operation_id' , 'start_date' , 'operation_type' , 'operation_status' , 'end_date' , 'productname' , 'quantity' , 'additional_info' ]
function OperationsComponent () {
    const { data , isLoading , isError , error} = useQuery({
        queryKey: ['operationsData'],
        queryFn: fetchAllOps,
    })

        if(isLoading) return <div>Loading...</div>
        if(isError) return <div>Error fetching data{error}</div>
    return (
        <MainTable theadContent={theadContent} data={data} tbodyContent={tbodyContent} />

    )
}
export default OperationsComponent ;