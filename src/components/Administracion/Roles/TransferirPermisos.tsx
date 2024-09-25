import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { IRolePermiso } from "../../../types/IRolPermiso";
import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Card, CardHeader, Divider } from "@mui/material";

interface TransferirPermisosProps {
  data: IRolePermiso[];
}

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.includes(value));
}

const TransferirPermisos = forwardRef(
  ({ data }: TransferirPermisosProps, ref: Ref<unknown> | undefined) => {
    const [checked, setChecked] = useState<readonly number[]>([]);

    const [left, setLeft] = useState<readonly number[]>(
      data.filter((x) => x.ver !== true).map((x) => x.id)
    );
    const [right, setRight] = useState<readonly number[]>(
      data.filter((x) => x.ver !== false).map((x) => x.id)
    );

    useEffect(() => {
      setLeft(
        data.length > 0
          ? data.filter((x) => x.ver !== true).map((x) => x.id)
          : []
      );
      setRight(
        data.length > 0
          ? data.filter((x) => x.ver !== false).map((x) => x.id)
          : []
      );
    }, [data]);

    useImperativeHandle(ref, () => ({
      getData: () => {
        return right;
      },
    }));

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const handleAllRight = () => {
      setRight(right.concat(left));
      setLeft([]);
    };

    const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
      setLeft(left.concat(right));
      setRight([]);
    };

    const customList = (text: string, items: readonly number[]) => (
      // <Paper sx={{ overflow: "auto", height: "100%" }}>
      <Card>
        <CardHeader
          sx={{ pr: 0, px: 2 }}
          subheader={text}
        />
        <Divider />
        <List
          dense
          component="div"
          role="list"
          sx={{
            bgcolor: "background.paper",
            overflow: "auto",
            height: "65vh",
          }}
        >
          {items.map((value: number) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItemButton
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.includes(value)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${data.find((x) => x.id === value)?.pantalla}`}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Card>
      // </Paper>
    );

    return (
      <Grid
        container
        spacing={4}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid
          width="40vw"
          height="75vh"
          item
        >
          {customList("Vistas disponibles", left)}
        </Grid>
        <Grid
          width="10vw"
          item
        >
          <Grid
            container
            direction="column"
            sx={{ alignItems: "center" }}
          >
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid
          width="40vw"
          height="75vh"
          item
        >
          {customList("Vistas a las que tiene permiso el rol", right)}
        </Grid>
      </Grid>
    );
  }
);

export default TransferirPermisos;
