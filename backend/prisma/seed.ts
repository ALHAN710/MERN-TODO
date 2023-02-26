import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { TUser } from "../src/@types/@user";
import { T_Task } from "../src/@types/@task";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  // sets locale to en_US
  faker.locale = "en_US";

  const users: any[] = []; // array of users
  const tasks: any[] = []; // array of tasks

  const nbTask: number = faker.datatype.number({ min: 10, max: 20 });

  // ============ Users loop ============
  const nbUser = 10; // number of Users
  for (let u = 0; u < nbUser; u++) {
    // const userGender = faker.helpers.arrayElement<"female" | "male">(genders);
    // const user_ = await createRandomUser(u === 0);
    const user: any = { ...(await createRandomUser(u === 0)) };

    const userCreated = await prisma.user.create({
      data: { ...user },
    });

    if (userCreated) {
      // ============ Tasks loop ============
      for (let t = 0; t < nbTask; t++) {
        const task: any = { ...createRandomTask(userCreated.id) };
        const taskCreated = await prisma.task.create({
          data: { ...task },
          // include: { user: true },
        });
        // Add the current task to the array of tasks
        tasks.push(taskCreated);
      }
    }

    // Add the current user to the array of users
    users.push(userCreated);
  }
  await prisma.$disconnect();
  console.log("=================== Tasks ===================");
  console.table(tasks);
  console.log("=================== Users ===================");
  console.table(users);
}

async function createRandomUser(isDemoUser = false): Promise<TUser> {
  const password = await bcrypt.hash("password", 10);
  if (isDemoUser)
    return {
      isActive: true,
      email: "demo@mern-todolist.com",
      firstName: "Test",
      lastName: "DEMO",
      password,
    };

  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName(sex);
  const email = faker.helpers.unique(faker.internet.email, [
    firstName,
    lastName,
  ]);

  return {
    isActive: false,
    email,
    firstName,
    lastName,
    password,
  };
}

function createRandomTask(userId: string): T_Task {
  return {
    title: faker.hacker.phrase(),
    // title       : faker.lorem.sentence(faker.datatype.number({ min: 3, max: 6 })),
    isDone: faker.helpers.arrayElement([false, true]),
    isImportant: faker.helpers.arrayElement([false, true]),
    isTrashed: faker.helpers.arrayElement([false, true]),
    priority: faker.helpers.arrayElement(["HIGH", "MIDDLE", "LOW"]),
    description: faker.lorem.paragraph(8),
    userId,
  };
}

main()
  .then(() => console.log("Fixtures data script successfully executed 😀 !"))
  .catch((e) => console.log(e));
