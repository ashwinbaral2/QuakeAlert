import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Activity, Clock, MapPin, Ruler } from "lucide-react";
interface EarthquakeAlert {
    id: string;
    title: string;
    description: string;
    magnitude?: number;
    location?: string;
    date?: string;
}
const EarthQuakeCard = () => {
    return (
        <div>
            <div className=" mb-4 mt-16">
                <h2 className="text-2xl font-bold m-2">Significant Earthquakes</h2>
                <Card className=" p-5 ml-2 w-xs h-full">
                <CardTitle className="text-2xl font-bold bg-red-700 text-white rounded-t-2xl p-2">Nepal</CardTitle>
                <CardContent className="border-2 p-2 " >
                    <p className="text-sm ">
                        <Activity className="w-4 h-4 inline mr-2" />
                        <b>Magnitude:</b> 7.8 Mw
                    </p>
                    <p className="text-sm">
                        <Clock className="w-4 h-4 inline mr-2" />
                        <b>Date:</b> 2015-04-25 06:11:26 UTC
                    </p>
                    <p className="text-sm">
                        <MapPin className="w-4 h-4 inline mr-2" /> 
                        <b>Co-ordinate:</b> 28.147°N, 84.708°E
                    </p>
                    <p className="text-sm">
                        <Ruler className="w-4 h-4 inline mr-2" />
                        <b>Depth:</b> 8.2 km
                    </p>
                </CardContent>
            </Card>
            </div>
            
        </div>
    );
};

export default EarthQuakeCard;
