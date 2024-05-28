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
        description: 'Come stay the night in this Spooky Apartment, located in the heart of the city. This apartment brings a whole new meaning to the city that never sleeps!',
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
        description: "Located off Spooky Blvd, Grandma Aggies' house is the perfect place to stay. Enjoy the rich history of Halloween Town smack dab in the middle, only a two minute walk from The Giant Pumpkin!",
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
        description: 'Do you have what it takes to stay the night in the very house Insidious Chapter 2 was filmed in? Located in Highland Park, come check out the surreal Insidious house and get the chills running up your spine from the eerie feeling you are being watched.',
        price: 242
      },
      {
        ownerId: 3,
        address: '666 Elm St',
        city: 'Springwood',
        state: 'OH',
        country: 'USA',
        lat: 41.1236,
        lng: -81.6589,
        name: 'Freddy\'s Nightmare House',
        description: 'Face your fears in this nightmarish home where Freddy Krueger was said to haunt. Perfect for thrill-seekers looking to spend a night on Elm Street.',
        price: 320
      },
      {
        ownerId: 3,
        address: '1313 Mockingbird Lane',
        city: 'Mockingbird Heights',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'The Munster Mansion',
        description: 'Stay in the iconic Munster Mansion. This Gothic-style home offers a spooky yet charming atmosphere, perfect for fans of the classic TV show.',
        price: 270
      },
      {
        ownerId: 3,
        address: '14 W Elm St',
        city: 'Amityville',
        state: 'NY',
        country: 'USA',
        lat: 40.6782,
        lng: -73.9442,
        name: 'Amityville Horror House',
        description: 'Dare to stay in the infamous Amityville Horror House. Known for its eerie past, this house is sure to give you chills with its mysterious and haunted history.',
        price: 350
      },
      {
        ownerId: 3,
        address: '1007 Mountain Dr',
        city: 'Gotham City',
        state: 'NJ',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0059,
        name: 'Wayne Manor',
        description: 'Experience luxury with a spooky twist in Wayne Manor. Rumors say the mansion is haunted by the ghosts of the Wayne family and a giant bat creature.',
        price: 400
      },
      {
        ownerId: 3,
        address: '777 Frankenstein St',
        city: 'Transylvania',
        state: 'TR',
        country: 'Romania',
        lat: 45.9432,
        lng: 24.9668,
        name: 'Dr. Frankenstein\'s Castle',
        description: 'Stay in the legendary castle of Dr. Frankenstein. This ancient fortress offers a chilling ambiance and spectacular views of the Carpathian Mountains.',
        price: 450
      },
      {
        ownerId: 3,
        address: '500 Addams Family Rd',
        city: 'Westfield',
        state: 'NJ',
        country: 'USA',
        lat: 40.6584,
        lng: -74.3496,
        name: 'Addams Family Mansion',
        description: 'Join the creepy and kooky Addams Family for a stay in their mysterious mansion. With hidden rooms and a gothic atmosphere, this is a place you won’t forget.',
        price: 390
      },
      {
        ownerId: 3,
        address: '13 Ghosts Ln',
        city: 'Willows Grove',
        state: 'PA',
        country: 'USA',
        lat: 40.2732,
        lng: -76.8867,
        name: '13 Ghosts House',
        description: 'Enter if you dare! This house is known to be haunted by 13 ghosts, each with their own terrifying story. Perfect for ghost hunters and brave souls.',
        price: 310
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
