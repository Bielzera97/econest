import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ProductCardProps = { 
  title: string;
  image: string;
  
};

const ProductCard: React.FC<ProductCardProps> = ({ title, image}) => {
  return (
<Card sx={{ maxWidth: 300, maxHeight:350 }} className="flex flex-col ">
  <CardMedia
    sx={{ height: 200 }}
    image={image}
    title={title}
    className="object-cover"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      {title}
    </Typography>
  </CardContent>
  <CardActions >
    <Button variant="contained">Comprar</Button>
    <Button>Saber mais</Button>
  </CardActions>
</Card>

  );
};

export default ProductCard;
