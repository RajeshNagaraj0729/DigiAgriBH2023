import React from "react";
import { MentionsInput, Mention } from "react-mentions";
import "./TagsStyles.css";

import * as constants from "../../constants";

const TagsInput = (props) => {
  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    const users = [
      ...new Set(
        mentions
          .filter((mention) =>
            props.tagValues.users.some((x) => x.id === mention.id)
          )
          .map((mention) => mention.id)
      ),
    ];
    const diseases = [
      ...new Set(
        mentions
          .filter((mention) =>
            props.tagValues.diseases.some((x) => x.id === mention.id)
          )
          .map((mention) => mention.id)
      ),
    ];
    props.setComment(newValue);
    props.setMentions({ users, diseases });
    props.setPlainText(newPlainTextValue);
  };

  const userMentionData = props.tagValues.users.map((myUser) => ({
    id: myUser.id,
    display: myUser.name,
    pic: myUser.profilepic,
  }));

  const hashtagData = props.tagValues.diseases.map((hash) => ({
    id: hash.id,
    display: hash.name,
    pic: hash.imageUrl,
  }));

  const renderUserList = (
    suggestion,
    search,
    highlightedDisplay,
    index,
    focused
  ) => {
    return (
      <div className={focused ? "focused" : ""}>
        <div className="d-flex">
          <img
            className="listprofilepic"
            src={constants.mediaUrl + suggestion.pic + constants.sasToken}
            alt="Not found"
          />
          {highlightedDisplay}
        </div>
      </div>
    );
  };

  const renderDiseasesList = (
    suggestion,
    search,
    highlightedDisplay,
    index,
    focused
  ) => {
    return (
      <div className={focused ? "focused" : ""}>
        <div className="d-flex">
          <img
            className="listprofilepic"
            src={constants.mediaUrl + suggestion.pic + constants.sasToken}
            alt="Not found"
          />
          {highlightedDisplay}
        </div>
      </div>
    );
  };

  return (
    <div>
      <MentionsInput
        value={props.comment}
        onChange={handleChange}
        placeholder="Use @ to tag other users # to mention disease."
        className="mentions"
        allowSpaceInQuery
      >
        <Mention
          trigger="@"
          data={userMentionData}
          className="mentions__mention"
          markup="@[__display__](__id__)"
          displayTransform={(id, display) => `@${display}`}
          appendSpaceOnAdd
          renderSuggestion={renderUserList}
        />
        <Mention
          trigger="#"
          data={hashtagData}
          className="mentions__hashtag"
          markup="#[__display__](__id__)"
          displayTransform={(id, display) => `#${display}`}
          appendSpaceOnAdd
          renderSuggestion={renderDiseasesList}
        />
        {/* <Mention
               trigger={
                  /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
               }
               className="mentions__link"
               markup="__display__ "
               displayTransform={(display) => `${display} `}
            /> */}
      </MentionsInput>
    </div>
  );
};

export default TagsInput;
