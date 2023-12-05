const User = require("../model/user");
const mongoose = require('mongoose');

async function add(data, callback) {
    try {
        console.log("data: " + JSON.stringify(data));
        const user = new User(data);
        await user.save();
        callback({ success: true });
    } catch (err) {
        console.log(err);
        callback({ success: false, error: err.message });
    }
}

async function show(req, res, next) {
    try {
        console.log('Fetching user data...');
        const data = await User.find() || [];
        console.log('Fetched data:', data);
        // Assurez-vous que res est défini avant d'appeler json
        if (res) {
            res.json(data);
        } else {
            console.error('Response object is undefined');
        }
        // Retournez également les données si vous avez besoin de les utiliser dans d'autres parties du code
        return data;
    } catch (err) {
        console.error('Error fetching user data:', err);

        // Assurez-vous que res est défini avant d'appeler status
        if (res) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.error('Response object is undefined');
        }
        // Retournez null ou une valeur par défaut en cas d'erreur
        return null;
    }
}


async function update(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send("updated");
    } catch (err) {
        console.log(err);
    }
}

async function deleteclass(userId, callback) {
    try {
        console.log('Deleting user with ID:', userId);

        // Validate if userId is a valid ObjectId (optional but recommended)
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('Invalid user ID');
            return callback({ success: false, message: 'Invalid user ID' });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            console.log('User not found');
            return callback({ success: false, message: 'User not found' });
        }

        console.log('User deleted successfully');
        callback({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        callback({ success: false, message: 'Internal Server Error' });
    }
}
async function authenticate(data, callback) {
    try {
        const { username, password } = data;
        // Assurez-vous que les champs requis sont fournis
        if (!username || !password) {
            return callback({ success: false });
        }
        // Recherchez l'utilisateur dans la base de données par nom d'utilisateur et mot de passe
        const user = await User.findOne({ username, password });
        // Vérifiez si l'utilisateur existe
        if (user) {
            // Redirigez vers le tableau de bord si l'utilisateur est trouvé
            // Incluez le rôle dans le callback
            return callback({ success: true, role: user.role });
        } else {
            // Retournez le résultat avec succès:false si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect
            return callback({ success: false });
        }
    } catch (err) {
        console.log(err);
        // Une erreur s'est produite pendant l'authentification, retournez le résultat avec succès:false
        return callback({ success: false });
    }
}




module.exports = { add, show, update, deleteclass, authenticate };
