const mongoose = require('mongoose'); // importerar mongoose för att skapa schema
const bcrypt = require('bcrypt'); // importerar bcrypt för att hasha lösenord

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Användarnamn krävs'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-post krävs'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Lösenord krävs'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hashar lösenordet innan usern sparas
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Jämför lösenord vid inloggning
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Skapar modellen
const User = mongoose.model('User', userSchema);

// Exporterar modellen
module.exports = User;