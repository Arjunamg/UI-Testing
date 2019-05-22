import { Selector,ClientFunction, Role } from "testcafe";
import createMaterial from './../Tests/MaterialManager/createMaterial';
import edit from './../Tests/MaterialManager/editCard'
import common from './../Tests/common.test'
import orderName from './../Helpers/RandomNames';
import BasicParams from './../Helpers/BasicParams';
import GC_Role from './../Helpers/Roles';





// const urlNav = ClientFunction(url => {
//   location.href = url;
//   location.reload(true);
// });
// const url = "https://app.manufacton.com/#/materials/preparation";
// const GC_Role = new Role(
//   BasicParams.url,
//   async t => {
//     await t
//       .typeText(Selector('input[type="email"]'), BasicParams.email)
//       .typeText(Selector('input[type="password"]'), BasicParams.password)
//       .pressKey("enter");
//     await urlNav(url);
//   },
//   { preserveUrl: true }
// );

const name = orderName.name();


fixture`Material Manager`
  .beforeEach(async t => {
    await t
      .maximizeWindow()
      .wait(500).useRole(GC_Role());
  });

test('Material', async t => {
  /*Material Card creation with:
    1. Order Level Dates and Level and zone
    2. 5 items, each with FM required and item notes
    3. Checklist for order*/
  await createMaterial.createMaterial(name);
  await common.search(name);
  //Function for splitting the order
  await common.split(`Split-of-${name}`);
  await common.clearSearch();
  await common.search(name);
  //Function for Cloning the Order
  await common.clone();
  await common.search(`Clone Of ${name}`);
  await common.clearSearch();
  //Function for Combining Order
  await common.combine(`${name}`,`Split-of-${name}`);
  await common.search(`Clone Of ${name}`);
  //Function For Removing the material order
  await common.remove();
  await common.clearSearch();
  await common.search(name);
  await common.move('forward','FM');
  await common.clearSearch();
  await t.navigateTo('https://app.manufacton.com/#/materials/qa');
  await common.search(name);
  await edit.editCard(name);
  await common.search(name);
  await common.move('forward','Ordering');
  await t.navigateTo('https://app.manufacton.com/#/materials/ordering');
  await common.search(name);
  await common.ship();
  await t.navigateTo('https://app.manufacton.com/#/scm/shipping/order-view');
  await common.search(name);
})




