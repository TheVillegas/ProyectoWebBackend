const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoutes');

config={SERVER:"localhost", PORT:3000}
const PORT = config.PORT || 3000;
 
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Servidor corriendo ✅');
});
 