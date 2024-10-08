/* eslint-disable react-hooks/exhaustive-deps */
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
import { useNavigate } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Maestras = () => {
  const navigate = useNavigate();

  const [parametroDetalle, setParametroDetalle] = useState<IParametroDetalle[]>(
    []
  );
  const [editable, setEditable] = useState(false);
  const { setData, data, selectedIndex, setSelectedIndex } =
    useParametroStore();
  const { setLoader, validarPermiso } = useDashboardStore();

  const Parametros = async () => {
    setLoader(true);
    const response = await getParametros();
    const data: IDataParametro = response;
    setData(data);
    setLoader(false);
  };

  useEffect(() => {
    if (!validarPermiso("Maestras")) {
      navigate("/permisos");
    } else {
      Parametros();
    }
  }, []);

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
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
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 gap-4 p-4">
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
          <Demo>
            <List className="max-h-80 overflow-y-auto">
              {data &&
                data.map((item: IParametro) => (
                  <div key={item.id}>
                    <ListItemButton
                      onClick={(event) => handleListItemClick(event, item.id)}
                      selected={selectedIndex === item.id}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <IconRenderer iconName={item.icono} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.nombre} />
                      {item.editable && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                        >
                          <span className="bg-sky-100 text-sky-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                            {item.parametros_detalles.length}
                          </span>
                        </IconButton>
                      )}
                    </ListItemButton>
                    <Divider />
                  </div>
                ))}
            </List>
          </Demo>
        </Grid>
      </div>
      <div className="w-full md:w-1/2 gap-4 p-4">
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
