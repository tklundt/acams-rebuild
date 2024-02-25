import { AddAssetForm } from "../_components/AddAssetForm";
import { currentUser } from "@/lib/auth";

const CreateAssetPage = async () => {
    const user = await currentUser();
    if(user?.role==='USER'){
        return (
            <div>
                <p className="text-2xl shadow-md bg-white text-red-700 p-4 rounded-lg">⚠️Access denied</p>
            </div>
        )
    }
    return (
        <AddAssetForm />
    );
}
export default CreateAssetPage; 