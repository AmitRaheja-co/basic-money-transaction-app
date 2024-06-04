import { useState, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found in local storage');
                }
                const response = await axios.get(
                    'http://localhost:3000/api/v1/account/balance',
                    {
                        headers: {
                            'authorization': `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
                setBalance(response.data.balance);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance || "Loading..."} />
                <Users />
            </div>
        </div>
    );
}
