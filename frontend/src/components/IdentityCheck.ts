import axiosInstance from "../api/axiosInstance";


export async function searchRoleByName(name: string): Promise<string | null> {

    try {
        const response = await axiosInstance.post(`/api/get-players`);
        const players = response.data;

        console.log(players)

        for (let i = 0; i < players.length; i++) {
            if (players[i].name === name) {
                return players[i].role;
            }
        }

        // Return null if name not found
        return null;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error; 
    }
}