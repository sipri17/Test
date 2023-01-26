const { User, Transaction, Company, Item } = require('../models')
const { verifyHash, generateToken } = require('../helpers')

class Controller {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ where: { username } })
            console.log('user>>', username);
            if (!user) throw { name: 'data not found', message: 'error invalid username or password' }
            const validPassword = verifyHash(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'error invalid username or password' }

            const payload = {
                id: user.id
            }

            const access_token = generateToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async addCompany(req, res, next) {
        try {
            const { name, companyCode } = req.body
            if (!name || !companyCode) throw { name: "required", message: "name and company code are required" }
            const company = await Company.create({ name, companyCode })

            res.status(201).json({ name: company.name, companyCode: company.companyCode })
        } catch (error) {
            next(error)
        }
    }

    static async showCompanies(req, res, next) {
        try {
            const companies = await Company.findAll()
            res.status(200).json(companies)
        } catch (error) {
            next(error)
        }
    }

    static async addTransaction(req, res, next) {
        try {
            const { companyId, itemId, totalItem } = req.body
            if (!companyId || !itemId || !totalItem) throw { name: "required", message: "all columns are required" }
            const item = await Item.findByPk(itemId)
            if (item.stock < totalItem) throw {name :"error400", message : "total item cannot be more than item stock"}
            const transaction = await Transaction.create({ companyId, itemId, totalItem, authorId: req.user.id })
            const newItem = await item.update({stock : (item.stock - totalItem)} )
            res.status(201).json(transaction)
        } catch (error) {
            next(error)
        }
    }

    static async showAllTransaction(req, res, next) {
        try {
            const transactions = await Transaction.findAll({
                include: [Item, Company]
            })

            const result = transactions.map(el=>{
                const totalPrice = el.totalItem * el.Item.price
                const tanggalInput = el.createdAt.toLocaleDateString('en-GB').split('/').join('-')
                const newEl = [tanggalInput,el.Company.name,el.Item.name,el.totalItem,el.Item.price,totalPrice,el.Item.stock]
                return newEl
                
            })

            let dataCSV = "Tanggal Input|Nama Perusahaan|Nama Barang|Total Barang|Harga Barang|Grand Total|Sisa Barang" + "\n" + result.map(e=>e.join("|")).join("\n")
        

            res.status(200).send(dataCSV)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller