'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return Promise.all([
            queryInterface.addColumn(
                'users',
                'image',
                {
                    type: Sequelize.STRING,
                    allowNull: true,
                }
            ),
            queryInterface.addColumn(
                'users',
                'role',
                {
                    type: Sequelize.ENUM('user', 'admin'),
                    allowNull: false,
                    defaultValue: 'user'
                }
            )
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return Promise.all([
            queryInterface.removeColumn('users', 'image'),
            queryInterface.removeColumn('users', 'role')
        ]);
    }
};
