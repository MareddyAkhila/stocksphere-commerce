const db =
require('../database/db')

const getDashboardSummary =
(req, res) => {

  const dashboard = {}

  // TOTAL ORDERS
  db.get(
    `
    SELECT COUNT(*)
    as totalOrders
    FROM orders
    `,
    [],

    (err, orderResult) => {

      if (err) {
        return res
        .status(500)
        .json({
          error:
          err.message
        })
      }

      dashboard.totalOrders =
      orderResult.totalOrders

      // TOTAL REVENUE
      db.get(
        `
        SELECT
        IFNULL(
          SUM(total_amount),
          0
        )
        as totalRevenue

        FROM orders

        WHERE status !=
        'Cancelled'
        `,
        [],

        (
          err,
          revenueResult
        ) => {

          if (err) {
            return res
            .status(500)
            .json({
              error:
              err.message
            })
          }

          dashboard.totalRevenue =
          revenueResult
          .totalRevenue

          // TOTAL SALES
          dashboard.totalSales =
          orderResult
          .totalOrders

          // TOTAL PRODUCTS
          db.get(
            `
            SELECT COUNT(*)
            as totalProducts
            FROM products
            `,
            [],

            (
              err,
              productResult
            ) => {

              dashboard
              .totalProducts =
              productResult
              .totalProducts

              // LOW STOCK
              db.all(
                `
                SELECT
                id,
                name,
                stock
                FROM products
                WHERE stock < 5
                `,
                [],

                (
                  err,
                  lowStockResult
                ) => {

                  dashboard
                  .lowStockProducts =
                  lowStockResult

                  res.json(
                    dashboard
                  )
                }
              )
            }
          )
        }
      )
    }
  )
}

module.exports = {
  getDashboardSummary
}