const Login = (sequelize, DataTypes) => {
  const login = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false,
});

  return login;
};

module.exports = Login;