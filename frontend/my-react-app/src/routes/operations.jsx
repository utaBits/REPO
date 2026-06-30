import { fetchAllOps } from '../api/operations.js';
import { MainTable } from '../components/mainTable.jsx';
import { useQuery , useQueryClient , useMutation } from "@tanstack/react-query"
import { deleteOp , editOp } from "../api/operations.js"



const theadContent = ['ID' , 'START DATE' , 'TYPE' , 'STATUS' , 'END DATE' , 'PRODUCT' ,'QTY' , 'COMMENT'];
const tbodyContent = [ 'operation_id' , 'start_date' , 'operation_type' , 'operation_status' , 'end_date' , 'productname' , 'quantity' , 'additional_info' ]
function OperationsComponent () {

    const queryClient = useQueryClient()

    const { data: operationsData = [], isLoading , isError , error} = useQuery({
        queryKey: ['operationsData'],
        queryFn: fetchAllOps,
    })

    console.log("rendered" , operationsData)

    const mutation = useMutation({
        mutationFn: (opId) => deleteOp(opId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ 'operationsData' ]
            })
        }
    })
    const editMutation = useMutation({
        mutationFn: ({ opId , formContent }) => editOp({ opId , formContent }),
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: [ 'operationsData' ]
            })
        }
    })

        if(isLoading) return <div>Loading...</div>
        if(isError) return <div>Error fetching data{error}</div>
    return (
        <MainTable theadContent={theadContent} data={operationsData} tbodyContent={tbodyContent} onDelete={mutation.mutate} onEdit={ editMutation.mutateAsync }/>

    )
}
export default OperationsComponent ;