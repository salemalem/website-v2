import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - STYLED COMPONENTS /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Category = styled.div`
  padding: 1rem 2rem .25rem 2rem;

  .category-heading {
    transition-duration: .25s;
    transition-property: color;
  }

  .category {
    padding: 0 0 1rem 1.25rem;
    .category-heading {
      color: ${({ theme }) => theme.sideBar.categoryHeading.color};
      border: none;
      padding: 0;
      margin-bottom: .5rem;
    }

    .category {
      .category-heading {
        color: ${({ theme }) => theme.sideBar.categoryHeading.color};
        border: none;
        padding-top: 1rem;
        margin: 1rem 0 .5rem 0;
      }
    }
  }
`;

const CategoryHeading = styled.div`
  color: ${({ theme }) => theme.sideBar.categoryHeading.color};
  border-bottom: 1px solid ${({ theme }) =>
  theme.sideBar.categoryHeading.borderBottomColor};
  font-size: .8rem;
  font-weight: bold;
  letter-spacing: .1rem;
  margin-bottom: 1rem;
  padding: 0 0 .1rem 0;
  text-transform: uppercase;
  transition-duration: .25s;
  transition-property: border, color;
`;

const LinkContainer = styled.div`
  display: block;
  a {
    color: ${({ isActive, theme }) => {
  return isActive
    ? theme.sideBar.link.colorActive
    : theme.sideBar.link.colorInactive;
}};
    border-left: 4px solid;
    border-color: ${({ isActive }) => (isActive ? "#7dade2" : "transparent")};
    transition-duration: 0.25s;
    transition-property: border, color;
    padding-left: 1rem;
    margin: .1rem 0;

    &:hover {
      color: #7dade2;
      border-left: 4px solid #7dade2;
      text-decoration: none !important;
    }
  }
`;

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER - COMPONENT /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export default function RecursiveCategory(props) {
  const {
    category,
    state,
  } = props;

  const router = useRouter();

  return (
    <Category className="category">
      <CategoryHeading className="category-heading">
        {category.label}
      </CategoryHeading>
      {category.paths.map((path, index) => {
        if (path.is_directory) {
          return (
            <RecursiveCategory
              state={state}
              key={`${JSON.stringify(path)}_${index}`}
              category={path}
            />
          );
        }

        return (
          <LinkContainer
            key={`${JSON.stringify(path)}_${index}`}
            isActive={path.path == router.asPath}
          >
            {path.is_external && (
              <a
                href={path.path}
                rel="noreferrer"
                target="_BLANK"
              >
                {path.label}
              </a>
            )}
            {!path.is_external && (
              <Link
                href={path.path}
                passHref
              >
                <a onClick={() => state.setSideBarOpen(false)}>
                  {path.label}
                </a>
              </Link>
            )}
          </LinkContainer>
        );
      })}
    </Category>
  );
}
