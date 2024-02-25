import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";

export const AssetConditionCard = () => {
    const assetCountGood = db.asset.count({
        where: {
            condition: 'Good'
        }
    });
    const assetCountUsed = db.asset.count({
        where: {
            condition: 'Used'
        }
    });
    const assetCountPoor = db.asset.count({
        where: {
            condition: 'Poor'
        }
    });

    return (
    <Card className="w-[180px] h-[180px] m-2">
        <CardHeader>
            <p className="text-lg font-semibold text-center text-black -mt-2 -mb-4">
                Asset Condition
            </p>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        <div className="flex flex-row">
                <div className="m-2 text-center text-green-500">
                    Good
                    <p>{assetCountGood}</p>
                 </div>
            </div>
            <div className="flex flex-row">
                <div className="m-2 text-center">
                    Used
                    <p>{assetCountUsed}</p>
                 </div>
            </div>
            <div className="flex flex-row">
                <div className="m-2 text-center text-red-700">
                    Poor
                    <p>{assetCountPoor}</p>
                 </div>
            </div>
        </CardContent>
    </Card>
    );
}