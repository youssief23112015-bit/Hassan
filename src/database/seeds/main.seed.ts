import { DataSource } from 'typeorm'
import { dataSourceOptions } from '../data-source';
import { seedRoles } from './role.seed';
import { seedPermissions } from './permission.seed';
import { seedSettings } from './setting.seed';
import { seedBranch } from './branch.seed';

async function runSeeds() {
  const dataSource = new DataSource(dataSourceOptions);
  await dataSource.initialize();
  console.log('Database connected. Running seeds...');

  await seedPermissions(dataSource);
  await seedRoles(dataSource);
  await seedSettings(dataSource);
  await seedBranch(dataSource);

  console.log('All seeds completed successfully.');
  await dataSource.destroy();
}

runSeeds().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
