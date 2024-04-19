import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './styles.css'

const ArticleCard = ({title, description, date, url}) => {
    return (
        <Card className='article_card' sx={{ maxWidth: 345 }}>
                    <CardHeader title= {title} />
                    <CardMedia
                    component="img"
                    height="200"
                    src={url}
                    alt="Paella dish"
                  
                />
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography  variant="caption" display="block" color="gray" gutterBottom>
                        {date}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
    );
};

export default ArticleCard;