import axios from 'axios';

export const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/get-users');
        const usersData = response.data.map((user, index) => ({
            id: index + 1,
            name: `${ user.firstName } ${ user.lastName }`,
            email: user.email,
            phone: user.contact,
            access: user.role,
        }));
        console.log(usersData);
        return usersData;

    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};