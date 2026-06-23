const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'j2iu1u4e',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});
async function count() {
  const menus = await client.fetch('count(*[_type == "menuItem"])');
  const locations = await client.fetch('count(*[_type == "location"])');
  const posts = await client.fetch('count(*[_type == "post"])');
  console.log('Sanity Menu Items: ' + menus);
  console.log('Sanity Locations: ' + locations);
  console.log('Sanity Posts: ' + posts);
}
count();
