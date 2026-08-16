import { DataSource } from 'typeorm';

export async function seedBranch(dataSource: DataSource) {
  await dataSource.query(
    `INSERT INTO branches (name, address, phone, status) 
     VALUES ($1, $2, $3, $4) 
     ON CONFLICT DO NOTHING`,
    ['Main Branch', 'TBD - Update Address', 'TBD', 'active']
  );
  console.log('Default branch seeded.');
}
