import { render, screen } from "@testing-library/react";
import { Link } from "./Link"; // Link 컴포넌트 경로에 맞게 수정

describe("Link 컴포넌트", () => {
  test("링크 요소가 렌더링된다.", () => {
    render(<Link href="https://example.com">테스트 링크</Link>);

    const linkElement = screen.getByText("테스트 링크");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://example.com");
  });

  test("버튼으로 렌더링된다.", () => {
    render(<Link isButton>테스트 버튼</Link>);

    const buttonElement = screen.getByText("테스트 버튼");
    expect(buttonElement.tagName).toBe("BUTTON");
  });

  test("화살표 아이콘이 표시된다.", () => {
    render(<Link withArrow>링크에 화살표</Link>);

    const arrowIcon = screen.getByTestId("arrowright-icon"); // 아이콘에 `data-testid`를 추가했을 경우
    expect(arrowIcon).toBeInTheDocument();
  });

  test("secondary 스타일이 적용된다.", () => {
    render(<Link secondary>Secondary 스타일 링크</Link>);

    const linkElement = screen.getByText("Secondary 스타일 링크");
    expect(linkElement).toHaveStyle("color: #6e6e6e"); // color.mediumdark 값에 맞게 수정
  });

  test("tertiary 스타일이 적용된다.", () => {
    render(<Link tertiary>tertiary 스타일 링크</Link>);

    const linkElement = screen.getByText("tertiary 스타일 링크");
    expect(linkElement).toHaveStyle("color: #333333"); // color.dark 값에 맞게 수정
  });

  test("inverse 스타일이 적용된다.", () => {
    render(<Link inverse>Inverse 스타일 링크</Link>);

    const linkElement = screen.getByText("Inverse 스타일 링크");
    expect(linkElement).toHaveStyle("color: #f0f0f0"); // color.lightest 값에 맞게 수정
  });
});
