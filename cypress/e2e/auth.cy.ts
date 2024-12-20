describe("The Login Page", () => {
  // 각 테스트가 실행되기 전에 실행되는 설정
  beforeEach(() => {
    // POST 요청이 /authenticate에 들어오면 모의 인증으로 반환
    cy.intercept("POST", "/authenticate", {
      statusCode: 201,
      body: {
        user: {
          name: "Alice Carr",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        },
      },
    });

    // GET 요청이 /tasks에 들어오면  목록을 반환
    cy.intercept("GET", "/tasks", {
      statusCode: 201,
      body: {
        tasks: [
          { id: "1", state: "TASK_INBOX", title: "Build a date picker" },
          { id: "2", state: "TASK_INBOX", title: "QA dropdown" },
          {
            id: "3",
            state: "TASK_INBOX",
            title: "Write a schema for account avatar component",
          },
          { id: "4", state: "TASK_INBOX", title: "Export logo" },
          {
            id: "5",
            state: "TASK_INBOX",
            title: "Fix bug in input error state",
          },
          {
            id: "6",
            state: "TASK_INBOX",
            title: "Draft monthly blog to customers",
          },
        ],
      },
    });
  });

  it("user can authenticate using the login form", () => {
    // 테스트할 이메일과 비밀번호
    const email = "alice.carr@test.com";
    const password = "k12h1k0$5;lpa@Afn";

    // 특정 페이지로 이동 (스토리북 iframe )
    cy.visit("iframe.html?viewMode=story&id=components-page--default");

    // 이메일 입력 필드에 이메일을 입력
    cy.get("#email").type(email);
    // 비밀번호 입력 필드에 비밀번호를 입력
    cy.get("#password").type(`${password}`);

    // 로그인 버튼을 클릭
    cy.get("button[type=submit]").click();

    // 로그인 후 aria-label="tasks > li요소가 6개인지  확인
    cy.get('[aria-label="tasks"] li').should("have.length", 6);
  });
});
