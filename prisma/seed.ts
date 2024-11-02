const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDataBase() {
  try {
    await prisma.product.deleteMany();
    const price = 149.9;
    const productsTitle = [
      "20/21 SÃO PAULO OUTUBRO ROSA S-2XL",
      "Barcelona 2024/25 Home Jersey",
      "22/23 Vasco da Gama Home S-XXXL",
      "Real Madrid 2024/25 Home Jersey",
      "24-25 São Paulo home",
      "Botafogo 2024-25 Home Jersey",
      "23-24 Botafogo away",
      "Fortaleza FC 2024-25 Home Jersey",
      "22-23 Fortaleza Home",
      "Grêmio 2024-25 Home Jersey",
      "22-23 Grêmio away",
      "24-25 Flamengo home",
      "22-23 Flamengo away",
      "22-23 Palmeiras home",
      "22-23 Palmeiras away",
      "20-21 Corinthians away",
      "22-23 Corinthians home",
      "Atlético Mineiro 2024-25 Away Jersey",
      "23-24 Atlético Mineiro home",
      "Real Madrid 2023-24 Away Jersey",
      "Real Madrid 2023-24 Home Jersey",
      "22-23 Barcelona away",
      "Atletico Madrid 2024-25 Home Jersey",
      "22-23 Atletico Madrid home",
      "22-23 Villarreal home",
      "Villarreal 2024-25 Home Jersey",
      "Girona 2024-25 Home Jersey",
      "22-23 Girona away",
      "23-24 Betis home",
      "23-24 Betis Away",
      "22-23 Bayern Munich home",
      "21-22 Bayern Munich Away",
      "22-23 Bayern Munich away",
      "Borussia Dortmund 2024-25 Home Jersey",
      "Borussia Dortmund 2024-25 Away Jersey",
      "22-23 Bayern Leverkusen Home",
      "23-24 Bayer 04 Leverkusen Home",
      "23-24 Leipzig away",
      "22-23 RB Leipzig home",
      "21-22 Eintracht Frankfurt home",
      "Eintracht Frankfurt 2024-25 Home Jersey",
      "21-22 PSG away",
      "23-24 PSG home",
      "21-22 PSG home",
      "22-23 PSG away",
      "22-23 Marseille away",
      "23-24 Marseille Away",
      "23-24 Marseille home",
      "22-23 Monaco home",
      "20-22 Monaco Gucci Edition",
      "21-22 Lille home",
      "Lille 2024-25 Home Jersey",
      "23-24 Napoli Home",
      "23-24 Napoli Away",
      "22-23 Inter Milan Home",
      "21-22 Inter Milan home",
      "AC Milan 2024-25 Home Jersey",
      "AC Milan 2006-07 Away Retro Jersey",
      "21-22 AC Milan away",
      "Atalanta 2024-25 Final Edition Jersey",
      "Atalanta 2024-25 Home Jersey",
      "22-23 Roma Home",
      "20-21 Roma away",
      "21-22 Juventus home",
      "22-23 Juventus home",
    ];

    const teamShirts = [
      "https://drive.google.com/uc?id=1H50hViv3l26iExKYA-OmHS_1kGWFuWl-",
      "https://drive.google.com/uc?id=12ippjvWYKY1iYrDyqeSt6Lajwk4xcu6t",
      "https://drive.google.com/uc?id=1FYtnSm4NpJbTCFuA8eJJY4CRDzUEBXzd",
      "https://drive.google.com/uc?id=1tHXeiJgW2a6ZOoSq7RlNKEJLQdnsK10s",
      "https://drive.google.com/uc?id=1dByz9Q3kxDZc9tozA04yfAnXWxUMf68v",
      "https://drive.google.com/uc?id=1K3RnAk7d2CYu5p2D8Ait8fss2XdTyamW",
      "https://drive.google.com/uc?id=1ZDoJkUMy28-F6gelDqNJAVctbChZjOW4",
      "https://drive.google.com/uc?id=1AhUozfLHaFk5Lh22pLHDN69zn4FE6ai7",
      "https://drive.google.com/uc?id=1h3fjiR3upr2bpYdCeuyY61mel6KYVySd",
      "https://drive.google.com/uc?id=1Y1WE2oOmCVYumFI6UGzEN5Um8ZDM3ZQP",
      "https://drive.google.com/uc?id=1vPGJpP1Qvr7tFmzO1t3npO78w30cEuiY",
      "https://drive.google.com/uc?id=16NF-KBkG2_SufiWXH-THH3KtbA0CBNyN",
      "https://drive.google.com/uc?id=1kmMLy-PU4ld2YQFvY0FPsmIC9Tka3aRS",
      "https://drive.google.com/uc?id=1Dh8CZcW3xcb5tVoslsi5br0qzRenC-Yg",
      "https://drive.google.com/uc?id=1emxNPtjcSuAvytgH8TcxX6HrVjA7gfk9",
      "https://drive.google.com/uc?id=1rpYEaWBenw6J2ui9CI1iOL5LRE5t05Op",
      "https://drive.google.com/uc?id=1aOaZPTTAvyqT6oDN-EPd1-ASbUfWgcI3",
      "https://drive.google.com/uc?id=12bFSZZXyF8r0sTILXdnccJ35eniY7yDX",
      "https://drive.google.com/uc?id=196T-x7L99diVqYSk7lAKbTu-pnfaPCs0",
      "https://drive.google.com/uc?id=1KsWWNcl5ZC8onuxMlosiaGcJVoBZngaT",
      "https://drive.google.com/uc?id=1Etfn5FukJBmnTd8U-KKoaZ5-Q2XrR93l",
      "https://drive.google.com/uc?id=1QhLhObV1VBdnrTs4C8F1peW90T8PJji1",
      "https://drive.google.com/uc?id=1Y07mu5nkonhbAgGHEXKI2XGJOvlTPVYq",
      "https://drive.google.com/uc?id=1cHGmB3dF71-cu0QtiGfSvcfy0rZv22Gx",
      "https://drive.google.com/uc?id=1T1qSznLd-1L4O6CXx1Vyoattf74kGdup",
      "https://drive.google.com/uc?id=1Vd134p2wMsKqGdZz700jcjwiTg9zU2Ri",
      "https://drive.google.com/uc?id=1Bofo4mcfGPujoDMvhisDBga7e7l7vUF1",
      "https://drive.google.com/uc?id=1E0pokMmaw-7RpCvUK6pe_2jXTuVOnKKP",
      "https://drive.google.com/uc?id=1XDmHxOwlb57R_CbyHjx-OnjN4lSxTApL",
      "https://drive.google.com/uc?id=16M2IiLOWu1GdpAxFVBdk3A-2ZtKUl0Q7",
      "https://drive.google.com/uc?id=1bHvruixr6QOBLa1ICRnAdT00Llri0iue",
      "https://drive.google.com/uc?id=1fMNcPjmW1CL-xaFlzF-wOTizHBQQYjTc",
      "https://drive.google.com/uc?id=1rVLau3iJoHGv8FSqhLZ5d3wacbKwd_ar",
      "https://drive.google.com/uc?id=10Rn7LC7qU3mHiQ0NiIxsQIsm86EZVJWh",
      "https://drive.google.com/uc?id=1uHB-vMR068TzKwFj4WQ8iUlPBdBL2AHn",
      "https://drive.google.com/uc?id=1T5hb9vg7OxBXlgPbECtH9KSc3WOE_DWa",
      "https://drive.google.com/uc?id=1Q8SCro9qyhJSv7HflarBBvBB1LTTfO_F",
      "https://drive.google.com/uc?id=1c7TsN9nrLYoJiN3HlL8J17IEImktNil1",
      "https://drive.google.com/uc?id=1G1FLqCJU5rI3FsIS6w8c0Zs-hQMzh715",
      "https://drive.google.com/uc?id=1jO9jw1QLAQ1lble0_QwshBL-yS-MK_1U",
      "https://drive.google.com/uc?id=1OnaDEjSHNdepkYK55IaU5Wl07qsy60yZ",
      "https://drive.google.com/uc?id=1EZYOupDN0_LqEVgVfwsHaKU1sNrZORJe",
      "https://drive.google.com/uc?id=1CvT77f6gJXs5Qt0mbh4Ovh6swUUXb1lO",
      "https://drive.google.com/uc?id=1d8uy-FNYBh7CgzMKal93D3n6tW8fM1yT",
      "https://drive.google.com/uc?id=1EDUL5kk_-BJ4n5FU3v_G5WGVFYphGqUz",
      "https://drive.google.com/uc?id=14qh23fVR6EOYgND1v2dn_256axtH5RF9",
      "https://drive.google.com/uc?id=1pg5IzMZ5KAprCRsbeWcd-0LnohdCm0v5",
      "https://drive.google.com/uc?id=1SSTe4kRHr7h_v3h_DEJ8hN5lf4AVGp8S",
      "https://drive.google.com/uc?id=16XaazRjzMdbOEDYeu1_SsXIRe7Q1U8id",
      "https://drive.google.com/uc?id=1ihDsQhyp7CqcwaHtYtvDDlZDyweZqiiT",
      "https://drive.google.com/uc?id=1tZnigr91YHeTuSHSB7Ak0f6kUob0gxS6",
      "https://drive.google.com/uc?id=1qUg_T6kV4Buib0tgeWPjDvoiu6AuVq2D",
      "https://drive.google.com/uc?id=1Uh5eUEN9aprgmUsqgYia1U9PAE8-eEy_",
      "https://drive.google.com/uc?id=18Lu0NnmuxWtLnTGVwl7eua8f95f_YKTO",
      "https://drive.google.com/uc?id=1BrRbcQ2oPkzhJSnZub6yhCEuc8FoS3tK",
      "https://drive.google.com/uc?id=12aikRgDEhrZSZHZ7vNGBEYJwFvJHAGpp",
      "https://drive.google.com/uc?id=1eisjkL48hovPZLSti25rRbHZcifikB9b",
      "https://drive.google.com/uc?id=1EkuCouyw8CSxrExDro7VKmmB16PmuVXL",
      "https://drive.google.com/uc?id=1N-yKEwVyF8DxpqfQx4w7qMk2BxlkaeLI",
      "https://drive.google.com/uc?id=1k65Rm3tuX32WBMi6WjxHlvUCA6D8q34q",
      "https://drive.google.com/uc?id=1SsrsfKOKIE1NQgqtwO79lKpC6bvBEcIQ",
      "https://drive.google.com/uc?id=1g2FvZ3WSp9M-hNgIUiO846A_hHgK_51s",
      "https://drive.google.com/uc?id=1cKTjmyuKl6ZtX-C9q8IH9Uko8gqFyjVB",
      "https://drive.google.com/uc?id=1JpsbL5r6jkwm3iyQCoyw3hFOrDuJGz2Q",
      "https://drive.google.com/uc?id=1pf1_7p0pujOaKKYE44K7xuEQnQK1vbch",
    ];

    const teamNames = [
      "São Paulo",
      "Barcelona",
      "Vasco da Gama",
      "Real Madrid",
      "São Paulo",
      "Botafogo",
      "Botafogo",
      "Fortaleza",
      "Fortaleza",
      "Grêmio",
      "Grêmio",
      "Flamengo",
      "Flamengo",
      "Palmeiras",
      "Palmeiras",
      "Corinthians",
      "Corinthians",
      "Atlético Mineiro",
      "Atlético Mineiro",
      "Real Madrid",
      "Real Madrid",
      "Barcelona",
      "Atletico Madrid",
      "Atletico Madrid",
      "Villarreal",
      "Villarreal",
      "Girona",
      "Girona",
      "Real Betis",
      "Real Betis",
      "Bayern Munich",
      "Bayern Munich",
      "Bayern Munich",
      "Borussia Dortmund",
      "Borussia Dortmund",
      "Bayern Leverkusen",
      "Bayern Leverkusen",
      "RB Leipzig",
      "RB Leipzig",
      "Eintracht Frankfurt",
      "Eintracht Frankfurt",
      "Paris Saint Germain",
      "Paris Saint Germain",
      "Paris Saint Germain",
      "Paris Saint Germain",
      "Marseille",
      "Marseille",
      "Marseille",
      "Monaco",
      "Monaco",
      "Lille",
      "Lille ",
      "Napoli",
      "Napoli",
      "Inter Milan",
      "Inter Milan",
      "AC Milan",
      "AC Milan",
      "AC Milan",
      "Atalanta",
      "Atalanta",
      "Roma",
      "Roma",
      "Juventus",
      "Juventus",
    ];

    const teamLeagues = [
      "Brasileirão Série A",
      "La Liga",
      "Brasileirão Série A",
      "La Liga",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "Brasileirão Série A",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "La Liga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Bundesliga",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Ligue 1",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
      "Serie A",
    ];

    for (let i = 0; i < productsTitle.length; i++) {
      const productTitle = productsTitle[i];
      const imageUrl = teamShirts[i];
      const teamName = teamNames[i];
      const teamLeague = teamLeagues[i];

      await prisma.product.create({
        data: {
          productTitle: productTitle,
          imageUrl: imageUrl,
          team: teamName,
          league: teamLeague,
          price: price,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna. Nam non erat neque. In hac habitasse platea dictumst. Pellentesque molestie accumsan tellus id laoreet.",
        },
      });
    }
    await prisma.$disconnect();
  } catch (error) {
    console.log("Erro ao criar os produtos: ", error);
  }
}

seedDataBase();
