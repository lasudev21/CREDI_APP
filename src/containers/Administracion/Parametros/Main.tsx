import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getParametros } from "../../../services/parametroService";
import {
  IDataParametro,
  IParametro,
  IParametroDetalle,
} from "../../../types/IParametro";
import { useParametroStore } from "../../../store/ParametroStore";
import IconRenderer from "../../../components/Common/IconRenderer";
import { Divider, ListItemButton } from "@mui/material";
import ListaDetalles from "../../../components/Administracion/Parametros/ListaDetalles";
import { useDashboardStore } from "../../../store/DashboardStore";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Maestras = () => {
  const [parametroDetalle, setParametroDetalle] = useState<IParametroDetalle[]>(
    []
  );
  const [editable, setEditable] = useState(false);
  const { setData, data, selectedIndex, setSelectedIndex } = useParametroStore();
  const { setLoader } = useDashboardStore();

  const Parametros = async () => {
    setLoader(true);
    const response = await getParametros();
    const data: IDataParametro = response;
    setData(data);
    setLoader(false);
  };

  useEffect(() => {
    Parametros();
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    const pd = data.filter((element) => element.id === index);
    if (pd !== null) {
      setEditable(pd[0].editable);
      setParametroDetalle(pd[0].parametros_detalles);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 gap-4 p-4">
        <Grid
          item
          xs={12}
          md={6}
          gap={4}
        >
          <Typography
            component="div"
            className="border-b-2 border-sky-800 bg-white p-4 text-center"
          >
            Configuración de parámetros
          </Typography>
          <Demo key={`DEMO[0][0]`}>
            <List key={"LT[0][0]"}>
              {data &&
                data.map((item: IParametro, index: number) => {
                  return (
                    <>
                      <ListItemButton
                        key={`LIB[0][${index}]`}
                        onClick={(event) => handleListItemClick(event, item.id)}
                        selected={selectedIndex === item.id}
                      >
                        <ListItemAvatar key={`LIA[0][${index}]`}>
                          <Avatar>
                            {
                              <IconRenderer
                                iconName={item.icono}
                                key={item.icono}
                              />
                            }
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.nombre}
                          key={`LIT[0][${index}]`}
                        />
                        {item.editable && (
                          <IconButton
                            key={`IB[0][${index}]`}
                            edge="end"
                            aria-label="delete"
                          >
                            <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-sky-900 dark:text-sky-300">
                              {item.parametros_detalles.length}
                            </span>
                          </IconButton>
                        )}
                      </ListItemButton>
                      <Divider />
                    </>
                  );
                })}
            </List>
          </Demo>
        </Grid>
      </div>
      <div className="w-1/2 gap-4 p-4">
        <div className="shadow border-l-2 bg-white border-sky-800">
          <ListaDetalles
            data={parametroDetalle}
            editable={editable}
            parametroId={selectedIndex}
            Parametros={Parametros}
          />
        </div>
      </div>
    </div>
  );
};
export default Maestras;
