const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

config={SERVER:"localhost", PORT:3000}
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Servidor corriendo ✅');
});
 
app.use('/api/users', userRoutes);