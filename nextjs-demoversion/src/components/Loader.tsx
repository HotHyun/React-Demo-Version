interface IProps {
    show: boolean;
}

export default function Loader(props: IProps) {
    return props.show ? <div className="loader"></div> : null;
}
