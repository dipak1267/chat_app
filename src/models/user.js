
const user =  (sequelize, DataTypes) => {

    const user = sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        auth_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        user_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        user_password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, { timestamps: false })
    return user
}

module.exports = user