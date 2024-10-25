const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDataBase() {
  try {
    const price = 150;
    const productsTitle = [
      "20/21 SÃO PAULO OUTUBRO ROSA S-2XL",
      "Barcelona 2024/25 Home Jersey",
      "22/23 Vasco da Gama Home S-XXXL",
      "Real Madrid 2024/25 Home Jersey",
    ];

    const teamShirts = [
      "https://drive.google.com/file/d/1H50hViv3l26iExKYA-OmHS_1kGWFuWl-/view?usp=drive_link",
      "https://drive.google.com/file/d/12ippjvWYKY1iYrDyqeSt6Lajwk4xcu6t/view?usp=drive_link",
      "https://drive.google.com/file/d/1FYtnSm4NpJbTCFuA8eJJY4CRDzUEBXzd/view?usp=sharing",
      "https://drive.google.com/file/d/1tHXeiJgW2a6ZOoSq7RlNKEJLQdnsK10s/view?usp=sharing",
    ];

    const teamNames = [
      "São Paulo",
      "Barcelona",
      "Vasco da Gama",
      "Real Madrid",
    ];

    const teamLeagues = [
      "Brasileirão Série A",
      "La Liga",
      "Brasileirão Série A",
      "La Liga",
    ];

    for (let i = 0; i < productsTitle.length; i++) {
      const productTitle = productsTitle[i];
      const imageUrl = teamShirts[i];
      const teamName = teamNames[i];
      const teamLeague = teamLeagues[i];

      const product = await prisma.product.create({
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

      await prisma.$disconnect();
    }
  } catch (error) {
    console.log("Erro ao criar os produtos: ", error);
  }
}

seedDataBase();
