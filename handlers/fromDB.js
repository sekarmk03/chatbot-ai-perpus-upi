const {biblio_copy, member, sequelize} = require('../models');
const {Op} = require('sequelize');

module.exports = {
    extendBook: async (barcode_nmbr) => {
        const borrow = await biblio_copy.findOne({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            where: {
                barcode_nmbr: barcode_nmbr,
                status_cd: 'out',
                renewal_count: 0,
            }
        });

        if (!borrow) {
            return false;
        }

        await biblio_copy.update({
            due_back_dt: sequelize.literal(`DATE_ADD(due_back_dt, INTERVAL 14 DAY)`),
            renewal_count: 1
        }, {
            attributes: { exclude: ['updatedAt'] },
            where: { barcode_nmbr: barcode_nmbr },
        });

        const newBorrow = await biblio_copy.findOne({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            where: {
                barcode_nmbr: barcode_nmbr,
            }
        });

        const response = {
            barcode_nmbr: newBorrow.barcode_nmbr,
            due_back_dt: newBorrow.due_back_dt
        };

        return response;
    },

    administration: async (nim) => {
        const data = await member.findAndCountAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            where: {
                barcode_nmbr: {
                    [Op.like]: `%${nim}`
                }
            }
        });

        console.log(data.count);

        if (data.count <= 0) {
            return false;
        }

        const checkFree = await member.findAndCountAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            where: {barcode_nmbr: `A${nim}`}
        });

        if (checkFree.count != 0) {
            response = 'BEBAS PINJAM'
        } else {
            response = 'BELUM BEBAS PINJAM'
        }

        return response;
    }
}