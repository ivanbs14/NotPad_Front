import { Conteiner } from './style';
import { Tag } from '../Tag'

export function Note({ data, ...rest }) {

    return (
        <Conteiner {...rest}>
            <h1>{data.title}</h1>

            {
                data.tags &&
                <footer>
                    {
                        data.tags.map(tag => 
                            <Tag key={tag.id}
                                title={tag.name}
                            />
                        )
                    }
                </footer>
            }
        </Conteiner>
    )
}