const { Client } = require('pg')
const client = new Client({
    connectionString: 'postgres://htzqnzhcpiaine:a46690fa980c225868d1e494e78e4f62649dd68be5dac5db7bcb5ef89e2113fb@ec2-54-82-205-3.compute-1.amazonaws.com:5432/d1iui2b0rdacdh',
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
  module.exports ={showAll}