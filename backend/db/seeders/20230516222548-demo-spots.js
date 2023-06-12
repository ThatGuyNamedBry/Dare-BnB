'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Essex St',
        city: 'Salem',
        state: 'MA',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Hocus Pocus Cottage',
        description: 'Former home to the Sanderson Sisters, come visit where these fierce witches once lived. Story has it you can still hear their laughs echoing throughout the night sky whenever there is a full moon.',
        price: 284
      },
      {
        ownerId: 2,
        address: '123 Main St',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Spooky Apartment',
        description: 'Come stay the night in this Spooky Apartment, located in the heart of the city. This apartment brings a whole new meaning to the ciity that never sleeps!',
        price: 199
      },
      {
        ownerId: 3,
        address: '789 Spooky Blvd',
        city: 'HalloweenTown',
        state: 'OR',
        country: 'USA',
        lat: 39.77,
        lng: -110.41,
        name: 'Grandma Aggies House',
        description: "Located off Spooky Blvd, Grandma Aggies' house is the perfect place to stay. Enjoy the rich history of Halloween Town smack dab in the middle, only a two minute walk from the giant Pumpkin!",
        price: 380
      },
      {
        ownerId: 1,
        address: '221 Main St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 50.7128,
        lng: -94.0060,
        name: 'Haunted House',
        description: 'Boo! Do you have the guts to stay the night here? Located in LA, only 10 minutes away from downtown, come soak in this spooky themed house!',
        price: 180
      },
      {
        ownerId: 1,
        address: '20042 Brown St',
        city: 'Highland Park, LA',
        state: 'CA',
        country: 'USA',
        lat: 60.7128,
        lng: -90.0060,
        name: 'Insidious Chapter 2 Home',
        description: 'Do you have what it takes to stay the night in the very house Insidious Chapter 2 was filmed in? Located in Highland Park, come check out the surreal Insidious house and get the chills running uop your spine from the eerie feeling you are being watched.',
        price: 242
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
