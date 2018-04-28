import React from "react";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";

export default function SearchResults(props) {
  return (
    <List>
      {props.results.length > 0 && <Subheader>Search Results</Subheader>}
      {props.results.map(r => (
        <ListItem
          key={r.id.videoId}
          primaryText={r.snippet.title}
          leftAvatar={<Avatar src={r.snippet.thumbnails.default.url} />}
          onClick={() => props.updateCurrentVideo(r.id.videoId)}
        />
      ))}
    </List>
  );
}
