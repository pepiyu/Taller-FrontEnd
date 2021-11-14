import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import useAuth from "../../hooks/useAuth";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";
import { mockAddProject } from "../../utils/mock-response";
import { Project } from "../../model/project";


const Submit = () => {
  let history = useHistory();
  let location = useLocation();
  const { t } = useTranslation();
  //const { project } = useAuth();
  //const { addNotification, removeLastNotification } = useApp();

  const [submitted, setSubmitted] = useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [version, setVersion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let { from } = (location.state as any) || { from: { pathname: "/" } };


  async function doSubmit(event: FormEvent<HTMLFormElement>) {
    dismissError();
    event.preventDefault();

    if (!readyToSubmit()) {
      setErrorMsg(t("project.err_titl_descrip"));
      return;
    }

    const project: Project = {
      id: "7890asdf890",
      title: title,
      description: description,
      version: version,
      link: "",
      tag: tags,
      timestamp: new Date(),
    }

    mockAddProject(project)


    setSubmitted(!submitted)

  }

  function goBack() {
    setSubmitted(false)
    goBackReset()
  }

  function goBackReset() {
    setTitle('')
    setDescription('')
    setTags('')
    setVersion('')
  }

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    onChangeAnyInput();
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    onChangeAnyInput();
  }

  function onChangeTags(e: ChangeEvent<HTMLInputElement>) {
    setTags(e.target.value);
    onChangeAnyInput();
  }

  function onChangeVersion(e: ChangeEvent<HTMLInputElement>) {
    setVersion(e.target.value);
    onChangeAnyInput();
  }

  function readyToSubmit(): boolean {
    // TODO: Add email check
    return title !== "" && description !== "";
  }

  function dismissError() {
    setErrorMsg("");
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleForm>{t("project.project_title")}</TitleForm>
        {!submitted ? 
        
        
        (
        <ProjectForm onSubmit={doSubmit}>
          { errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription>}
          <LoginForm name="title" type="text" placeholder={t("project.title_placeholder")} value={title} onChange={onChangeTitle}/>
          <LoginForm name="description" type="text" placeholder={t("project.description_placeholder")} value={description} onChange={onChangeDescription}/>
          <LoginForm name="tag" type="text" placeholder={t("project.tag_placeholder")} value={tags} onChange={onChangeTags}/>
          <LoginForm name="version" type="text" placeholder={t("project.version_placeholder")} value={version} onChange={onChangeVersion}/>
          <ButtonWrapper>
            <ButtonForm type="button" value={t("project.button_delete") != null ? t("project.button_delete") as string : "Delete"}  />
            <ButtonForm type="submit" value={t("project.button_post") != null ? t("project.button_post") as string : "Submit"}  />
          </ButtonWrapper>
        </ProjectForm>
        ) 
        : 
        (
        <ProjectResum>
          <InputRow>
            <Caption>{t("project.title_placeholder")}</Caption>
            <p>{title} </p>
          </InputRow>
          <InputRow>
            <Caption>{t("project.description_placeholder")}</Caption>
            <p>{description} </p>
          </InputRow>

          {tags !== '' ? 
          (
            <InputRow>
            <Caption>{t("project.tag_placeholder")}</Caption>
            <p>{tags} </p>
          </InputRow>
          ) 
          : null
        }
        {version !== '' ? 
        (
          <InputRow>
            <Caption>{t("project.version_placeholder")}</Caption>
            <p>{version} </p>
          </InputRow>
          ) 
          : null
        }
          <ButtonBackWrapper>
            <ButtonForm type="button" onClick={goBack} value={t("project.button_back") != null ? t("project.button_back") as string : "Back"}  />
          </ButtonBackWrapper>

        </ProjectResum>
        )
        }
      </ContentWrapper>
    </Wrapper>
  );
};


const InputRow = styled.div`
  line-height: 1.3;
`

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`

const ProjectForm = styled.form`
  padding: 20px 40px;
  width: 545px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
  }


`;

const ProjectResum = styled.div`
  padding: 20px 40px;
  width: 545px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
  }


`;

const ErrorDescription = styled(Caption)`
  grid-column: 1 / 3;

  color: ${themes.light.warning};
`;

const LoginForm = styled.input`
  grid-column: 1 / 3;
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }

`;

const ButtonBackWrapper = styled.div`
  justify-content: right;
  display: flex;
  column-gap: 16px
;
`;

const ButtonWrapper = styled.div`
  grid-column: 2 / 3;
  justify-content: right;
  display: flex;
  column-gap: 16px
;
`;

const ButtonForm = styled.input`
  width: 110px;
  height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.light.primary};
  }
`;


export default Submit;
