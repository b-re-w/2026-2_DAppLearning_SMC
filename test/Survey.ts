import { expect } from "chai";
import { network } from "hardhat";
import { keccak256 } from "ethers";

/* Week 1~4
it("Survey init", async () => {
    const { ethers } = await network.connect();

    const title: string = "막무가내 설문조사";
    const description: string = "중앙화된 설문조사로, 모든 데이터는 공개되지 않습니다.";
    const questions: Question[] = [
        {
            question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
            options: [
                "구글 폼 운영자", "탈 중앙화된 블록체인", "상관 없음"
            ]
        }
    ]

    const factory = await ethers.deployContract("SurveyFactory", [
        ethers.parseEther("50"),
        ethers.parseEther("0.1"),
    ]);
    const tx = await factory.createSurvey({
        title,
        description,
        targetNumber: 100,
        questions
    }, {
        value: ethers.parseEther("100"),
    }
    );
    const receipt = await tx.wait();
    let surveyAddress;
    receipt.logs.forEach((log) => {
        const event = factory.interface.parseLog(log);
        if (event?.name == "SurveyCreated") {
            surveyAddress = event.args[0];
        }
    });

    //const surveys = await factory.getSurveys();

    //const survey = await ethers.deployContract("Survey", [title, description, questions]);
    const surveyC = await ethers.getContractFactory("Survey");
    const signers = await ethers.getSigners();
    const respondent = signers[1];
    if (surveyAddress) {
        const survey = await surveyC.attach(surveyAddress);
        await survey.connect(respondent);
        console.log(
            ethers.formatEther(await ethers.provider.getBalance(surveyAddress))
        );
        const submitTx = await survey.submitAnswer({
            respondent: respondent,
            answers: [1]
        });
        await submitTx.wait();
        console.log(
            ethers.formatEther(await ethers.provider.getBalance(surveyAddress)),
        );
    }
})


describe("SurveyFactory Contract", () => {
    let factory: any, owner, respondent1, respondent2;

    let minPoolAmount: bigint, minRewardAmount: bigint;

    beforeEach(async () => {
        const { ethers } = await network.connect();
        [owner, respondent1, respondent2] = await ethers.getSigners();

        minPoolAmount = ethers.parseEther("50");
        minRewardAmount = ethers.parseEther("0.1");

        factory = await ethers.deployContract("SurveyFactory", [
            minPoolAmount,
            minRewardAmount,
        ]);
    });

    const targetNumber = 100;
    const sampleSurvey = {
        title: "막무가내 설문조사",
        description: "중앙화된 설문조사로, 모든 데이터는 공개되지 않습니다.",
        targetNumber: targetNumber,
        questions: [
            {
                question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
                options: ["구글 폼 운영자", "탈 중앙화된 블록체인", "상관 없음"],
            },
        ],
    };

    it("should deploy with correct minimum amounts", async () => {
        // check min_pool_amount and min_reward_amount

        // check min_pool_amount by giving less than min_pool_amount
        await expect(
            factory.createSurvey(sampleSurvey, {
                value: minPoolAmount - 1n,
            })
        ).to.be.revertedWith("Insufficient pool amount for survey creation");

        // check min_reward_amount by giving the smallest targetNumber that

        const tooLargeTargetNumber = minPoolAmount / minRewardAmount + 1n;
        await expect(
            factory.createSurvey(
                { ...sampleSurvey, targetNumber: tooLargeTargetNumber },
                { value: minPoolAmount }
            )
        ).to.be.revertedWith("Insufficient reward amount per respondent");

        // check valid case
        await expect(
            factory.createSurvey(sampleSurvey, { value: minPoolAmount })
        ).to.emit(factory, "SurveyCreated");
    });

    it("should create a new survey when valid values are provided", async () => {
        // prepare SurveySchema and call createSurvey with msg.value
        const tx = factory.createSurvey(sampleSurvey, { value: minPoolAmount * 2n });

        // check event SurveyCreated emitted
        await expect(tx).to.emit(factory, "SurveyCreated");

        // check surveys array length increased
        const surveys = await factory.getSurveys();
        expect(surveys.length).to.equal(1);
    });

    it("should revert if pool amount is too small", async () => {
        // expect revert when msg.value < min_pool_amount
        await expect(
            factory.createSurvey(sampleSurvey, { value: minPoolAmount / 5n })  // smaller than min_pool_amount
        ).to.be.revertedWith("Insufficient pool amount for survey creation");
    });

    it("should revert if reward amount per respondent is too small", async () => {
        // expect revert when msg.value / targetNumber < min_reward_amount
        const tooLargeTargetNumber = minPoolAmount / minRewardAmount + 1n;
        await expect(
            factory.createSurvey(
                { ...sampleSurvey, targetNumber: tooLargeTargetNumber },
                { value: minPoolAmount }
            )
        ).to.be.revertedWith("Insufficient reward amount per respondent");
    });

    it("should store created surveys and return them from getSurveys", async () => {
        // create multiple surveys and check getSurveys output
        await factory.createSurvey(sampleSurvey, { value: minPoolAmount * 2n });
        await factory.createSurvey(sampleSurvey, { value: minPoolAmount * 2n });
        const surveys = await factory.getSurveys();
        expect(surveys.length).to.equal(2);
    });
});
*/


// Week 5
it("Survey init (Week 5)", async () => {
    const { ethers } = await network.connect();

    const title: string = "막무가내 설문조사";
    const description: string = "중앙화된 설문조사로서, 모든 데이터는 공개되지 않습니다.";
    const questions: Question[] = [
        {
            question: "누가 내 응답을 관리할 때 더 솔직할 수 있을까요?",
            options: [
                "구글 폼 운영자", "탈 중앙화된 블록체인", "상관 없음"
            ]
        },
        {
            question: "test2",
            options: ["구글폼 운영자"]
        }
    ]

    const survey = await ethers.deployContract(
        "Survey",
        [title, description, 100, questions],
        {
            value: ethers.parseEther("100"),
        }
    );

    const slot0Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(0, 32)
    )
    const slot1Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(1, 32)
    )
    const slot2Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(2, 32)
    )
    const slot3Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(3, 32)
    )
    const slot4Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(4, 32)
    )
    const slot5Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(5, 32)
    )
    const slot6Data = await ethers.provider.getStorage(
        survey.getAddress(),
        ethers.toBeHex(6, 32)
    )

    const decodeUni = (hex: string) =>
        Buffer.from(hex.slice(2), "hex").toString("utf-8");

    const nextHash = (hex: string, i: number) =>
        "0x" + (BigInt(hex) + BigInt(i)).toString(16);

    // Primitive type
    console.log("Primitive type -------");
    console.log(slot2Data);
    console.log(slot3Data);

    // Long string type
    console.log("\nLong string type -------");
    console.log(slot0Data);  // 0x103 == 259 (length of the string)
                             // 259 = 129 * 2 + 1
    //// pDesc = hash256(pSlot1), getStorage(pDesc)
    const pDesc = keccak256(ethers.toBeHex(1, 32));
    const desc0 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pDesc, 0)
    );
    const desc1 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pDesc, 1)
    );
    const desc2 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pDesc, 2)
    );
    const desc3 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pDesc, 3)
    );
    const desc4 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pDesc, 4)
    );
    const desc = desc0 + desc1.slice(2) + desc2.slice(2) + desc3.slice(2) + desc4.slice(2);
    console.log(desc);
    console.log(decodeUni(desc));

    // Array & Structure type
    ////
    //// pQuestions:      0x8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b
    //// pQuestions + 1 : 0x8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19c
    ////
    //// question0  <------------ pQuestions
    //// question0_options[]  <-- pQuestions + 1
    //// question1  <------------ pQuestions + 2
    //// question1_options[]  <-- pQuestions + 3
    //// ...
    console.log("\nArray & Structure Type -------");
    console.log("slot4Data: ", slot4Data);
    const pQuestions = keccak256(ethers.toBeHex(4, 32));
    const question0 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pQuestions, 0)
    );
    const question0_options = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pQuestions, 1)
    );
    const question1 = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pQuestions, 2)
    );
    const question1_options = await ethers.provider.getStorage(
        await survey.getAddress(),
        nextHash(pQuestions, 3)
    );
    console.log("question0: ", question0);
    console.log("question0_options: ", question0_options);
    console.log("question1: ", question1, decodeUni(question1));
    console.log("question1_options: ", question1_options);

    // Mapping type
    //// map[keccak256(k, slot address)]
    console.log("\nMapping Type -------");
    console.log("slot6Data: ", slot6Data);
    const addr = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const mapKeyAddr = keccak256(ethers.toBeHex(addr, 32) + ethers.toBeHex(6, 32).slice(2));
    const map0Value = await ethers.provider.getStorage(
        await survey.getAddress(),
        mapKeyAddr
    );
    console.log("map0Value: ", map0Value);

    console.log("\n");
});


// Week 7 Mid-term Homework
describe("Survey init", () => {
    const title = "막무가내 설문조사라면";
    const description = "중앙화된 설문조사로서, 모든 데이터는 공개되지 않으며 설문조사를 게시한자만 볼 수 있습니다.";
    const questions: Question[] = [
        {
            question: "누가 내 응답을 관리할때 더 솔직할 수 있을까요?",
            options: [
                "구글폼 운영자",
                "탈중앙화된 블록체인 (관리주체 없으며 모든 데이터 공개)",
                "상관없음",
            ],
        },
    ];

    const getSurveyContractAndEthers = async (survey: {
        title: string;
        description: string;
        targetNumber: number;
        questions: Question[];
    }) => {
        const { ethers } = await network.connect();
        const cSurvey = await ethers.deployContract("Survey", [
            survey.title,
            survey.description,
            survey.targetNumber,
            survey.questions,
        ]);

        return { ethers, cSurvey };
    };

    describe("Deployment", () => {
        it("should store survey info correctly", async () => {
            const surveyData = {
                title,
                description,
                targetNumber: 100,
                questions,
            };

            // Deploy
            const { cSurvey } = await getSurveyContractAndEthers(surveyData);

            // Check stored data
            expect(await cSurvey.title()).to.equal(title);  // Check title
            expect(await cSurvey.description()).to.equal(description);  // Check description
            expect(await cSurvey.targetNumber()).to.equal(100n);  // Check targetNumber

            // Check questions
            const storedQuestions = await cSurvey.getQuestions();  // Get the stored questions
            expect(storedQuestions.length).to.equal(questions.length);  // Length check
            expect(storedQuestions[0].question).to.equal(
                questions[0].question  // Check question text
            );
            expect(storedQuestions[0].options).to.deep.equal(
                questions[0].options,  // Check question options
            );
        });

        it("should calculate rewardAmount correctly", async () => {
            const { ethers } = await network.connect();

            // Set config
            const targetNumber = 100;
            const poolAmount = ethers.parseEther("10");

            // Deploy
            const cSurvey = await ethers.deployContract(
                "Survey",
                [title, description, targetNumber, questions],
                { value: poolAmount },
            );

            // Calculate expected reward amount
            const expectedReward = poolAmount / BigInt(targetNumber);

            // Validate rewardAmount
            expect(await cSurvey.rewardAmount()).to.equal(expectedReward);
        });
    });

    describe("Questions and Answers", () => {
        it("should return questions correctly", async () => {
            // Prepare survey data with two questions
            const surveyData = {
                title,
                description,
                targetNumber: 100,
                questions: [
                    questions[0],
                    {
                    question: "두 번째 질문입니다.",
                    options: ["찬성", "반대"],
                    },
                ],
            };

            // Deploy
            const { cSurvey } = await getSurveyContractAndEthers(surveyData);

            // Retrieve stored questions
            const storedQuestions = await cSurvey.getQuestions();

            // Validate questions
            expect(storedQuestions.length).to.equal(2);  // Check length
            expect(storedQuestions[0].question).to.equal(  // Check first question text
                surveyData.questions[0].question,
            );
            expect(storedQuestions[0].options).to.deep.equal(  // Check first question options
                surveyData.questions[0].options,
            );
            expect(storedQuestions[1].question).to.equal(  // Check second question text
                surveyData.questions[1].question,
            );
            expect(storedQuestions[1].options).to.deep.equal(  // Check second question options
                surveyData.questions[1].options,
            );
        });

        it("should allow valid answer submission", async () => {
            const { ethers } = await network.connect();
            const [, respondent] = await ethers.getSigners();  // Set account

            const surveyData = {
                title,
                description,
                targetNumber: 100,
                questions,
            };

            // Deploy
            const cSurvey = await ethers.deployContract(
                "Survey",
                [
                    surveyData.title,
                    surveyData.description,
                    surveyData.targetNumber,
                    surveyData.questions,
                ],
                {
                    value: ethers.parseEther("10"),  // with reward pool
                },
            );
            const answer = {
                respondent: respondent.address,
                answers: [1],
            };

            // Submit answer
            await cSurvey.connect(respondent).submitAnswer(answer);

            // Validate stored answer
            const storedAnswers = await cSurvey.getAnswers();
            expect(storedAnswers.length).to.equal(1);  // Check answer amount
            expect(storedAnswers[0].respondent).to.equal(respondent.address);  // Check respondent address
            expect(storedAnswers[0].answers[0]).to.equal(1n);  // Check answer value
        });

        it("should revert if answer length mismatch", async () => {
            
        });

        it("should revert if target reached", async () => {
            
        });
    });

    describe("Rewards", () => {
        it("should pay correct reward to respondent", async () => {
            
        });
    });
});
