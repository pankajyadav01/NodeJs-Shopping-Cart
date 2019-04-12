const Sequelize = require('sequelize')
//const Op = Sequelize.Op
const db = new Sequelize({
    dialect: 'sqlite'  , // mysql, postgres, mssql

    storage: __dirname + '/shop.db'  // only needed for file based db

    //The following are needed for server base db
    //database: '',
    //host: 'localhost',
    //username: '',
    //password:'',
    //port: 8989

})

const vendors = db.define('vendor',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const products = db.define('product',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    vendor:{
        type: Sequelize.STRING
    },
    qty:{
        type: Sequelize.INTEGER,
        defaultValue: 1

    }
})

const users = db.define('user',{
    username: {
        type : Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },

})

const carts = db.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    qty:{
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})


vendors.hasMany(products,{onDelete: 'cascade'})
products.hasMany(carts,{onDelete: 'cascade'})

module.exports = {
    db, vendors, products, users, carts
}