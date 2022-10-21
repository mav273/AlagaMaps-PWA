const { Client } = require('pg')
const client = new Client({
    connectionString: XXXXX,
    ssl: {
      rejectUnauthorized: false
    }
  });

  async function showAll(){
    client.connect();
    const pointers = await client.query("SELECT type, latitude, longitude from pontos");
    const result = pointers.rows
    await client.end();

    return result
  }

  async function insertNew(x,y){
    client.connect();
    const insert = await client.query(`INSERT INTO pontos 
    (latitude, longitude) values 
    (' ${x}', '${y}')`);
    const result = insert
    await client.end();

  }
  