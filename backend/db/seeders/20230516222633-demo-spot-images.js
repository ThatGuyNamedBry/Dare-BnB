'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://i.redd.it/njmigiw3l7p31.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://cdn.vox-cdn.com/thumbor/OCqrB7vRkjgnErhNL4h8FhmpkuM=/0x0:1023x682/1200x0/filters:focal(0x0:1023x682):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/19299314/Stinson.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://cdn.vox-cdn.com/thumbor/7QlBrrAWq4JPln0I1pYb66mUWYU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19299312/Stinson_2.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://thumbs.dreamstime.com/b/view-golden-gate-bridge-15270243.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   spotId: 4,
      //   url: 'https://example.com/image5.jpg',
      //   preview: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};

/*
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
https://example.com/image4.jpg
*/
