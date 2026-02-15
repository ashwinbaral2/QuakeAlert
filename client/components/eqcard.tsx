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
                <CardTitle className="text-2xl font-bold">Nepal</CardTitle>
                <CardContent>
                    <p className="text-sm">
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
// "use client";

// import { useEffect, useState } from "react";
// import CardList from "@/components/eq-card/page";
// import EarthquakeMap from "@/components/maps/page"; // your map component

// interface EarthquakeAlert {
//     id: string;
//     title: string;
//     description: string;
//     magnitude: number;
//     location: string;
//     date: string;
// }

// export default function MapsPage() {
//     const [alerts, setAlerts] = useState<EarthquakeAlert[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetch("http://localhost:8080/api/earthquakes") // your backend endpoint
//             .then((res) => res.json())
//             .then((data) => {
//                 setAlerts(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Failed to fetch earthquake data:", err);
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <main className="p-4">
//             <h1 className="text-2xl font-bold mb-4">QuakeAlert</h1>

//             <EarthquakeMap />

//             {loading ? (
//                 <p>Loading alerts...</p>
//             ) : alerts.length > 0 ? (
//                 <CardList alerts={alerts} />
//             ) : (
//                 <p>No earthquake data available</p>
//             )}
//         </main>
//     );
// }
