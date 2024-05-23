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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669738651494426046/original/aec3bfdd-a7c7-4da1-ad41-826c62b5147e.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669738651494426046/original/dbd485b3-7830-454b-8548-742da7a1f483.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669738651494426046/original/3c8132b0-42e0-4614-9224-cd3c30e32b05.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669738651494426046/original/97977537-7faf-4643-8ed8-daa30445119a.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-669738651494426046/original/9bebf2ad-8dff-4493-8e0b-39154467b215.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://thinkingerrorfree.wordpress.com/wp-content/uploads/2018/10/new-york-state-of-mind-halloween-decorations-960x640.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.squarespace-cdn.com/content/v1/63ec08a7fa1d1a1947280fc6/1708128999893-YIGD2VY9EHOUZYKFYCY4/halloween-2021-home-tour-bedroom8.png',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.squarespace-cdn.com/content/v1/63ec08a7fa1d1a1947280fc6/1708129070772-NJWZT0SRHY94BMUWHCS0/halloween-2021-home-tour-bedroom9.png',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.squarespace-cdn.com/content/v1/63ec08a7fa1d1a1947280fc6/1708128999689-SOCJK6K21T8KRKUI5X5A/halloween-2021-home-tour-bedroom7.png',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://i0.wp.com/www.allhallowsgeek.com/wp-content/uploads/2018/11/cromwell-entrance.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://i0.wp.com/www.allhallowsgeek.com/wp-content/uploads/2018/11/halloweentown-cromwell-house.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://i0.wp.com/www.allhallowsgeek.com/wp-content/uploads/2018/11/cromwell-entryway.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://i0.wp.com/www.allhallowsgeek.com/wp-content/uploads/2018/11/cromwell-kitchen.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://s.abcnews.com/images/Lifestyle/haunted-house-ht-ml-171025_16x9_992.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://s.abcnews.com/images/Lifestyle/haunted-house2-ht-ml-171025_4x5_992.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://s.abcnews.com/images/Lifestyle/haunted-house1-ht-ml-171025_4x5_992.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://i0.wp.com/www.iamnotastalker.com/wp-content/uploads/2017/10/The-Smith-Estate-from-Insidious-Chapter-2-1200567-1.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://i0.wp.com/www.iamnotastalker.com/wp-content/uploads/2017/10/The-Smith-Estate-from-Insidious-Chapter-2-1200565.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://i0.wp.com/www.iamnotastalker.com/wp-content/uploads/2017/10/The-Smith-Estate-from-Insidious-Chapter-2-1200582.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://i0.wp.com/www.iamnotastalker.com/wp-content/uploads/2017/10/The-Smith-Estate-from-Insidious-Chapter-2-1200569.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://i0.wp.com/www.iamnotastalker.com/wp-content/uploads/2017/10/Screenshot-006370.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
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
