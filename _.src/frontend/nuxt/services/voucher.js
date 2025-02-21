class VoucherService {
    getVouchers() {
        return [
            {
                id: 1,
                title: "Zus RM8 Cash Voucher",
                description: "Maximum discount up to RM8",
                expired: "Oct 21, 2024",
                multiplier: 8,
                img: "/vouchers/brand1.png",
                points: 100,
                free: 30,
                about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu porttitor nisl. Mauris non sem consequat, cursus nunc eget, dictum est. Nam tincidunt ullamcorper lectus, in varius nisl vehicula et. Mauris congue cursus facilisis. Phasellus lobortis metus sed imperdiet laoreet. Nunc finibus ligula quis dolor hendrerit sodales. Aliquam erat volutpat. Nullam tempus tortor sit amet lorem suscipit convallis."
            },
            {
                id: 2,
                title: "KFC RM8 Cash Voucher",
                description: "Maximum discount up to RM8",
                expired: "Oct 21, 2024",
                multiplier: 8,
                img: "/vouchers/brand2.png",
                points: 100,
                free: 30,
                about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu porttitor nisl. Mauris non sem consequat, cursus nunc eget, dictum est. Nam tincidunt ullamcorper lectus, in varius nisl vehicula et. Mauris congue cursus facilisis. Phasellus lobortis metus sed imperdiet laoreet. Nunc finibus ligula quis dolor hendrerit sodales. Aliquam erat volutpat. Nullam tempus tortor sit amet lorem suscipit convallis."
            },
            {
                id: 3,
                title: "Family Mart RM8 Cash Voucher",
                description: "Maximum discount up to RM8",
                expired: "Oct 21, 2024",
                multiplier: 8,
                img: "/vouchers/brand3.png",
                points: 100,
                free: 30,
                about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu porttitor nisl. Mauris non sem consequat, cursus nunc eget, dictum est. Nam tincidunt ullamcorper lectus, in varius nisl vehicula et. Mauris congue cursus facilisis. Phasellus lobortis metus sed imperdiet laoreet. Nunc finibus ligula quis dolor hendrerit sodales. Aliquam erat volutpat. Nullam tempus tortor sit amet lorem suscipit convallis."
            }
        ]
    }
}

export default new VoucherService()