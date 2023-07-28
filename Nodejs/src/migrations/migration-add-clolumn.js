module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Bookings',
          'token',
          {
            type: Sequelize.STRING,
          },
        ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
